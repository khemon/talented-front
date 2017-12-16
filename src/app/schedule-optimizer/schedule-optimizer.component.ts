/**
 * Created by Khémon on 10/12/2017.
 */

import {Component, OnInit} from '@angular/core';
import {Talent} from "../model/talent";
import {ScheduleAdvisorService} from "../service/schedule-advisor.service";
import {Job} from "../model/job";
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {   CalendarEvent} from 'angular-calendar';

const colors: any = {
  red: {
    primary: '#ad2121',
    secondary: '#FAE3E3'
  },
  blue: {
    primary: '#1e90ff',
    secondary: '#D1E8FF'
  },
  yellow: {
    primary: '#e3bc08',
    secondary: '#FDF1BA'
  }
};

@Component({
  selector: 'schedule-optimizer',
  templateUrl: 'schedule-optimizer.component.html',
  providers: [ScheduleAdvisorService]
})


export class ScheduleOptimizerComponent{

  public distanceMax = 100;
  public calEvents: CalendarEvent[];
  private talents: Talent[];
  private startDate: Date;
  private endDate: Date;
  private targetAmount: number;
  private displayPlanning: boolean = false;


  constructor(private scheduleAdvisorService: ScheduleAdvisorService) {

  }


  adviseNewSchedule(){
    this.displayPlanning = false;
    let userId = JSON.parse(localStorage.getItem('currentUser')).id;

    this.scheduleAdvisorService.getCustomJobSchedule(userId, this.distanceMax)
      .subscribe(
        jobs => {
          alert("Planning remonté");
          this.displayPlanning = true;
          this.calEvents = this.createCalendarEvents(jobs);

        },

        error =>  console.log(<any>error));
  }

  createCalendarEvents(jobs: Job[]): CalendarEvent[]{
    let calEvents = [];
    for(var i = 0; i < Math.min(jobs.length, 10); i++){
      let cal = {
        start: subDays(startOfDay(jobs[i].date), 1),
        end: addHours(jobs[i].date, 5),
        title: jobs[i].talent.name,
        color: colors.red
      }
      calEvents.push(cal);
    }
    return calEvents;
  }

}
