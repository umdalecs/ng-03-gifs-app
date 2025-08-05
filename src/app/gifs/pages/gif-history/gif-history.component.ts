import { Component, computed, inject } from '@angular/core';
import { GifList } from '../../components/gif-list/gif-list';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'app-gif-history',
  imports: [GifList],
  templateUrl: './gif-history.component.html',
  styles: ``,
})
export default class GifHistory {
  gifsService = inject(GifsService);

  query = toSignal(
    inject(ActivatedRoute).params.pipe(map((params) => params['query']))
  );

  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));
}
