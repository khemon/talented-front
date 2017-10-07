/**
 * Created by Khémon on 07/12/2016.
 */
// just an interface for type safety.
export class Marker {
  lat: number;
  lng: number;
  draggable: boolean;
  label?: string;
  name?:string;
  picture?:string;
  constructor(){}
}
