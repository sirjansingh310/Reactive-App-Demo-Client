import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatchHighlight } from './match-highlight.model';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class MatchEventService{
    constructor(private httpClient: HttpClient){}


    getMatchEvents(): Observable<MatchHighlight[]>{
        const url: string = 'http://localhost:8080/match-highlights'
        return this.httpClient.get<MatchHighlight[]>(url);
    }

}