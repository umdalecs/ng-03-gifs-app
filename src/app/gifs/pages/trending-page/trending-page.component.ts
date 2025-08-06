import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  inject,
  viewChild,
} from '@angular/core';
import { GifsService } from '../../services/gifs.service';
import { ScrollStateService } from 'src/app/shared/services/scroll-state.service';

@Component({
  selector: 'app-trending-page',
  imports: [],
  templateUrl: './trending-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TrendingPageComponent implements AfterViewInit {
  gifsService = inject(GifsService);
  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');

  ngAfterViewInit(): void {
    const scroll = this.scrollDivRef()?.nativeElement;

    if (!scroll) return;

    scroll.scrollTop = this.scrollStateService.trendingScrollState();
  }

  onScroll(e: Event) {
    const scroll = this.scrollDivRef()?.nativeElement;

    if (!scroll) return;

    const { scrollTop, clientHeight, scrollHeight } = scroll;
    const isAtBottom = scrollTop + clientHeight + 100 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifsService.loadTrendingGifs();
    }
  }
}
