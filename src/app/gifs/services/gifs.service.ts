import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Gif, SearchResponse} from "../interfaces/gifs.interface";


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory: string[] = [];
  private giphyApiKey: string = 'K8vZZg1PJA84rXUo16UclEtDrhocJBF0';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor(private http: HttpClient) {
    this.loadLocalStorage('tags-history');

  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  private organizeHistory(tag: string) {
    tag = tag.toLowerCase();

    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter((oldTag) => oldTag !== tag);
    }

    this._tagsHistory.unshift(tag);
    this._tagsHistory = this._tagsHistory.splice(0, 10);

    this.saveLocalStorage('tags-history', JSON.stringify(this._tagsHistory))
  }

  private saveLocalStorage(key: string, value: string): void {
    localStorage.setItem(key, value);
  }

  private loadLocalStorage(key: string): void {
    if (!localStorage.getItem(key)) return;

    this._tagsHistory = JSON.parse(localStorage.getItem(key)!);
    if (this._tagsHistory.length === 0) return;

    this.searchTag(this._tagsHistory[0]);

  }

  searchTag(tag: string): void {
    if (tag.length === 0) return;
    this.organizeHistory(tag);

    const params = new HttpParams()
      .set('api_key', this.giphyApiKey)
      .set('limit', 10)
      .set('q', tag)

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, {params})
      .subscribe(resp => {
        this.gifList = resp.data;
      });
  }
}
