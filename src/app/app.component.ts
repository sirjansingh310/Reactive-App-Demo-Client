import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatchHighlight } from './match-highlight.model';
import { Subscription } from 'rxjs';
import { MatchEventService } from './match-highlight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  matchHighlights: MatchHighlight[];
  eventSource: EventSource = new EventSource("http://localhost:8080/match-highlights/live");

  constructor(private matchEventService: MatchEventService){}
  ngOnInit(){
    // initially load events stored in database by calling api
    this.matchEventService.getMatchEvents().subscribe(response => {
      this.matchHighlights = response;
      //now listen to live events
      this.eventSource.addEventListener('message', message => {
          this.matchHighlights.push(JSON.parse(message.data));// as live event stream sends text
      })
      
    })
  }
  
}
