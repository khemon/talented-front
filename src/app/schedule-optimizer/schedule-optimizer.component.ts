/**
 * Created by Khémon on 10/12/2017.
 */

import {Component, OnInit} from '@angular/core';
import {Talent} from "../model/talent";


@Component({
  selector: 'schedule-optimizer',
  templateUrl: 'schedule-optimizer.component.html',
  providers: []
})

export class ScheduleOptimizerComponent implements OnInit {

  private distanceMax: number;
  private talents: Talent[];
  private dateDebut: Date;
  private dateFin: Date;
  private montantCible: number;


  constructor() { }

  ngOnInit(){
    this.dateDebut = new Date();
    this.dateFin = new Date();
  }

}
