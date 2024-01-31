import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../../services/gifs.service";

@Component({
  selector: 'gifs-search-box',
  template: `
    <div id="search">
      <h5>Search:</h5>
      <input
        type="text"
        class="form-control"
        placeholder="Search gifs..."
        (keyup.enter)="searchTag()"
        #txtTagInput>
    </div>
  `,
  styles:" #search { margin-left: 200px; }"
})

export class SearchBoxComponent {

  @ViewChild('txtTagInput')
  public tagInput!: ElementRef<HTMLInputElement>

  constructor(private gifsService: GifsService) {
  }

  searchTag() {
    const newTag: string = this.tagInput.nativeElement.value;
    this.gifsService.searchTag(newTag);
    this.tagInput.nativeElement.value = '';
  }

}
