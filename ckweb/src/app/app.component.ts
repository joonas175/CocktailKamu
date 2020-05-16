import { Component, OnInit } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'ckweb';

  ngOnInit(): void {

    /**
     * jQuery and angular together may be a bad idea but I don't care.
     * Atleast this fixes pills not stacking up.
     */
    // Stack menu when collapsed
    $('#navbarSupportedContent').on('show.bs.collapse', () => {
      $('.nav-pills').addClass('flex-column');
    });

    // Unstack menu when not collapsed
    $('#navbarSupportedContent').on('hide.bs.collapse', () =>  {
      $('.nav-pills').removeClass('flex-column');
    });
  }

}
