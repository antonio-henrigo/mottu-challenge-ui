import { Injectable } from '@angular/core';
import { Character } from '../models/character.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoriteService {

  private favoriteCharacters: Character[] = [];
  private favoriteCountSubject = new BehaviorSubject<number>(0);
  favoriteCount$ = this.favoriteCountSubject.asObservable();

  constructor() {
    this.loadFavorites();
  }

  getFavoriteCount(): number {
    return this.favoriteCharacters.length;
  }

  isFavorite(character: Character): boolean {
    return this.favoriteCharacters.some(c => c.id === character.id);
  }

  addToFavorites(character: Character): void {
    if (!this.isFavorite(character)) {
      this.favoriteCharacters.push(character);
      this.favoriteCountSubject.next(this.favoriteCharacters.length);
      this.saveFavorites();
    }
  }

  removeFromFavorites(character: Character): void {
    this.favoriteCharacters = this.favoriteCharacters.filter(c => c.id !== character.id);
    this.favoriteCountSubject.next(this.favoriteCharacters.length);
    this.saveFavorites();
  }

  toggleFavorite(character: Character): void {
    if (this.isFavorite(character)) {
      this.removeFromFavorites(character);
    } else {
      this.addToFavorites(character);
    }
  }

  loadFavorites(): void {
    const favorites = localStorage.getItem('favoriteCharacters');
    if (favorites) {
      this.favoriteCharacters = JSON.parse(favorites);
      this.favoriteCountSubject.next(this.favoriteCharacters.length);
    }
  }

  saveFavorites(): void {
    localStorage.setItem('favoriteCharacters', JSON.stringify(this.favoriteCharacters));
  }

  getFavoriteCharacters(): Character[] {
    return this.favoriteCharacters;
  }


}
