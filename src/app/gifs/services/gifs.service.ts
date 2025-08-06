import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { GiphyResponse } from '../interfaces/giphy.interfaces';
import { Gif } from '../interfaces/gif.interface';
import { mapGiphyItemsToGifArray } from '../mapper/gif.mapper';
import { map, Observable, tap } from 'rxjs';

const loadLocalStorage = () => {
  const storage = localStorage.getItem('history');

  return storage ? JSON.parse(storage) : {};
};

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private http = inject(HttpClient);
  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(false);

  private trendingPage = signal(0);

  trendingGifsGroups = computed(() => {
    const trending = this.trendingGifs();
    const groups = [];

    for (let i = 0; i < trending.length; i += 3) {
      groups.push(trending.slice(i, i + 3));
    }

    return groups;
  });

  searchHistory = signal<Record<string, Gif[]>>(loadLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  saveGifsToLocalStorage = effect(() => {
    localStorage.setItem('history', JSON.stringify(this.searchHistory()));
  });

  constructor() {
    this.loadTrendingGifs();
  }

  loadTrendingGifs(): void {
    if (this.trendingGifsLoading()) {
      return;
    }

    this.trendingGifsLoading.set(true);

    this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/trending`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 24,
          rating: 'g',
          offset: 24 * this.trendingPage(),
        },
      })
      .subscribe((resp) => {
        const newGifs = mapGiphyItemsToGifArray(resp.data);
        this.trendingGifs.update((oldGifs) => [...oldGifs, ...newGifs]);
        this.trendingPage.update((page) => page + 1);
        this.trendingGifsLoading.set(false);
      });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http
      .get<GiphyResponse>(`${environment.giphyUrl}/gifs/search`, {
        params: {
          api_key: environment.giphyApiKey,
          limit: 3 * 4 * 2,
          q: query,
          rating: 'g',
        },
      })
      .pipe(
        map((resp) => mapGiphyItemsToGifArray(resp.data)),
        tap((items) => {
          this.searchHistory.update((history) => ({
            ...history,
            [query.toLowerCase()]: items,
          }));
        })
      );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }
}
