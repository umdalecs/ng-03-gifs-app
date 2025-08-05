import {
  ChangeDetectionStrategy,
  Component,
  inject,
  signal,
} from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { Gif } from '../../interfaces/gif.interface';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class SearchPageComponent {
  gifsService = inject(GifsService);
  gifs = signal<Gif[]>([]);

  onSearch(value: string) {
    this.gifsService.searchGifs(value).subscribe((gifs) => {
      this.gifs.set(gifs);
    });
  }
}
