import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Not, Repository } from 'typeorm';
import { AnnouncedPuResults } from './entity/announced_pu_results.entity';
import { Lga } from './entity/lga.entity';
import { Party } from './entity/party.entity';
import { PollingUnit } from './entity/polling_unit.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(PollingUnit)
    private readonly pollingRepo: Repository<PollingUnit>,
    @InjectRepository(AnnouncedPuResults)
    private readonly announcedPuResultsRepo: Repository<AnnouncedPuResults>,
    @InjectRepository(Lga)
    private readonly lgaRepo: Repository<Lga>,
    @InjectRepository(Party)
    private readonly partyRepo: Repository<Party>,
  ) {}

  async getAllPollingCenters() {
    // get all polling units
    return this.pollingRepo.find({
      where: { polling_unit_number: Not('') },
    });
  }

  async getResultPollingCenter(value: number) {
    // get polling_unit result
    return this.announcedPuResultsRepo.find({
      where: { polling_unit_uniqueid: +value },
    });
  }

  async getAllLga() {
    // get all lgas
    return this.lgaRepo.find();
  }

  async getAllParties() {
    // get all lgas
    return this.partyRepo.find();
  }

  async getResultPerLga(name: string) {
    // find lga by name
    const lga = await this.lgaRepo.findOne({ where: { lga_name: name } });
    //if no lga retun an empty array ... error handling
    if (!lga) {
      return [];
    }

    // get all polling units in an lga
    const polling_units = await this.pollingRepo.find({
      where: { lga_id: lga.lga_id },
    });

    // get all the results from each polling unit
    const results_polling_unit = await Promise.all(
      polling_units.map(async (unit) => {
        return this.announcedPuResultsRepo.find({
          where: { polling_unit_uniqueid: unit.uniqueid },
        });
      }),
    );

    // flatten the result to a one layer array
    const results_polling_unit_flatten = results_polling_unit.flat();

    // get all parties
    const parties_duplicate = results_polling_unit_flatten.map(
      (result) => result.party_abbrevaition,
    );

    // get unique parties
    const parties = new Set(parties_duplicate);
    const objKey = {};
    parties.forEach((party) => {
      objKey[party] = {
        name: party,
        votes: 0,
      };
    });

    // calculate results
    results_polling_unit_flatten.map((result) => {
      if (objKey[result.party_abbrevaition]) {
        objKey[result.party_abbrevaition].votes += result.party_score;
      }
    });

    // place results in an array
    const results = [];
    Object.keys(objKey).forEach((key) =>
      results.push({ name: key, votes: objKey[key].votes }),
    );

    return results;
  }

  async createPuResult(body) {
    const newResutlt = this.announcedPuResultsRepo.create(body);
    return this.announcedPuResultsRepo.save(newResutlt);
  }
}
