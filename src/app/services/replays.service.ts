import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ReplayModel } from '../components/models/replay.model';

const appKey = "kid_S1klkIW4M"; // APP KEY HERE;
const appSecret = "beea2e830dec4141a64f7bb7e08953c5"; // APP SECRET HERE;
const baseUrl = `https://baas.kinvey.com/appdata/${appKey}`;

@Injectable()
export class ReplayService {

    constructor(
        private http: HttpClient
    ) { }

    getReplay(replayId: string): Observable<ReplayModel> {
        let getUrl = baseUrl + `/replays/${replayId}`;
        return this.http.get<ReplayModel>(
            getUrl,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        );
    }

    getReplays(): Observable<ReplayModel[]> {
        let userId = localStorage.getItem('userId');
        let getUrl = baseUrl + `/replays?query={"_acl.creator":"${userId}"}`;
        return this.http.get<ReplayModel[]>(
            getUrl,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    postReplay(model: ReplayModel): Observable<Object> {
        let postReplayUrl = baseUrl + '/replays';
        return this.http.post(
            postReplayUrl,
            JSON.stringify(model),
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    deleteReplay(replayId: string): Observable<Object> {
        let deleteReplayUrl = baseUrl + `/replays/${replayId}`;
        return this.http.delete(
            deleteReplayUrl,
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    updateReplay(replayId: string, model: ReplayModel): Observable<Object> {
        let updateReplayUrl = baseUrl + `/replays/${replayId}`;
        return this.http.put(
            updateReplayUrl,
            JSON.stringify(model),
            {
                headers: this.createAuthHeaders('Kinvey')
            }
        )
    }

    private createAuthHeaders(type: string): HttpHeaders {
        if (type === 'Basic') {
            return new HttpHeaders({
                'Authorization': `Basic ${btoa(`${appKey}:${appSecret}`)}`,
                'Content-Type': 'application/json'
            })
        } else {
            return new HttpHeaders({
                'Authorization': `Kinvey ${localStorage.getItem('authtoken')}`,
                'Content-Type': 'application/json'
            })
        }
    }
}