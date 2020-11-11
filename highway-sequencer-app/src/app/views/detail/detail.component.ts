import { Component, OnInit } from '@angular/core';
import {StreamService} from "../../services/stream.service";
import {ActivatedRoute, Router} from "@angular/router";
import {StreamModel} from "../../models/stream.model";

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  public stream: StreamModel;

  constructor(private router: Router, private activatedRoute: ActivatedRoute, private streamService: StreamService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.stream = this.streamService.getStream(params.streamId);
    });
  }



}
