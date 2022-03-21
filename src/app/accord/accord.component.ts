import { Component, OnInit } from '@angular/core';
import { IconProp } from '@fortawesome/fontawesome-svg-core';
import { faBell, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-accord',
  templateUrl: './accord.component.html',
  styleUrls: ['./accord.component.css']
})
export class AccordComponent implements OnInit {

  faBell = faBell as IconProp
  faChevronDown = faChevronDown as IconProp
  faTrash = faTrash as IconProp
  name = false
  constructor() { }

  ngOnInit(): void {
  }
  getToggle() {
    this.name = !this.name
  }
}
