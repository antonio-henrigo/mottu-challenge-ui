import { Component } from '@angular/core';
import { Character } from '../../models/character.model';
import { FavoriteService } from '../../services/favorite.service';

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrl: './favorite.component.scss'
})
export class FavoriteComponent {

  showMessageTitle!: string;
  showMessageDescription!: string;

  constructor(private favoriteService: FavoriteService) {
    this.showMessageTitle = 'Parece que você ainda não tem favoritos';
    this.showMessageDescription = 'Volte à página inicial e escolha os melhores para você.';
  }

  get filteredCharacters(): Character[] {
    return this.favoriteService.getFavoriteCharacters();
  }

  isFavorite(character: Character): boolean {
    return this.favoriteService.isFavorite(character);
  }

  toggleFavorite(character: Character): void {
    this.favoriteService.toggleFavorite(character);
  }

  isMessageFavoriteNotFound(): boolean {
    return this.filteredCharacters.length === 0;
  }
}
