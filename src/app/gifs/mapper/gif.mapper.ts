import { Gif } from '../interfaces/gif.interface';
import { GiphyItem } from '../interfaces/giphy.interfaces';

export function mapGiphyItemToGif(item: GiphyItem): Gif {
  return {
    id: item.id,
    title: item.title,
    url: item.images.original.url,
  };
}

export function mapGiphyItemsToGifArray(items: GiphyItem[]): Gif[] {
  return items.map(mapGiphyItemToGif);
}
