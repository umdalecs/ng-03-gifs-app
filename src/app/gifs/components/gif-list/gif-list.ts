import { Component, input } from '@angular/core';
import { GifListItem } from './gif-list-item/gif-list-item';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
  styles: ``,
})
export class GifList {
  gifs = input.required<any[]>();
}
