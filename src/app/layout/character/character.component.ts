import { Component, inject } from '@angular/core';
import { Character } from '../../models/character.model';
import { CharacterService } from '../../services/character.service';
import { take } from 'rxjs';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrl: './character.component.scss'
})
export class CharacterComponent {
  value = '';
  showMessage = false;

  characters!: Character[];
  filteredCharacters!: Character[];
  favoriteCharacters: Character[] = [];


  constructor(
    private characterService: CharacterService,
    private favoriteService: FavoriteService
  ) {}

  ngOnInit() {
    this.characterService.getCharacters().pipe(take(1)).subscribe({
      next: (response) => {
        this.characters = response.results;
        this.filteredCharacters = this.characters;
      }
    });
  }

  filterCharacters(searchValue: string) {
    this.filteredCharacters = this.characters.filter(character =>
      character.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    this.showMessage = this.filteredCharacters.length === 0;
  }

  isFavorite(character: Character): boolean {
    return this.favoriteService.isFavorite(character);
  }

  toggleFavorite(character: Character): void {
    this.favoriteService.toggleFavorite(character);
  }

  getFavoriteCount(): number {
    return this.favoriteCharacters.length;
  }


}

