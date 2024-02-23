import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FavoriteService } from '../../../services/favorite.service';
import { Character } from '../../../models/character.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

  favoriteCount = 0;

  constructor(private route: Router, private favoriteService: FavoriteService) {
    this.favoriteService.favoriteCount$.subscribe(count => {
      this.favoriteCount = count;
    });
  }

  ngOnInit(): void {
    this.favoriteCount = this.favoriteService.getFavoriteCount();
  }

  homeSelected: boolean = true;
  favoriteSelected: boolean = false;

  toggleHomeSelected() {
    this.homeSelected = !this.homeSelected;
    if (this.homeSelected) {
      this.favoriteSelected = false;
    }
  }

  goToHome(){
    this.toggleHomeSelected();
    this.route.navigate(['/inicio'])
  }

  toggleFavoriteSelected() {
    this.favoriteSelected = !this.favoriteSelected;
    if (this.favoriteSelected) {
      this.homeSelected = false;
    }
  }

  goToFavorite(){
    this.toggleFavoriteSelected();
    this.route.navigate(['/favoritos'])
  }

  toggleFavorite(character: Character) {
    if (this.favoriteService.isFavorite(character)) {
      this.favoriteService.removeFromFavorites(character);
    } else {
      this.favoriteService.addToFavorites(character);
    }
    this.favoriteCount = this.favoriteService.getFavoriteCount();
  }


}
