import {Injectable} from "@angular/core";
/**
 * Created by Khémon on 07/12/2016.
 */
@Injectable()
export class Utils {
  constructor() {  }
  /**
   * Transforme l'object json (id, name) en (id, text)
   * pour afficher les données dans ngSelect
   * TODO: a revoir
   * @param jobTypes
   */
  transformJobTypes(jobTypes: Array<any>) {
    for (var i = 0; i < jobTypes.length; i++) {
      jobTypes[i].text = jobTypes[i].name;
      delete jobTypes[i].name;
    }
    return jobTypes;
  }



}
