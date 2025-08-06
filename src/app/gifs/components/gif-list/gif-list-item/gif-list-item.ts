import { Component, input } from '@angular/core';

@Component({
  selector: 'gif-list-item',
  imports: [],
  templateUrl: './gif-list-item.html',
  styles: `:host{
    display: contents;
  }`,
})
export class GifListItem {
  imageUrl = input.required<string>();
}
