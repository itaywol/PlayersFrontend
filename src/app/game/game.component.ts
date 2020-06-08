import { map, filter, mergeMap } from 'rxjs/operators';
import { degreesToRadians, point, destination } from '@turf/turf';
import { Component, OnInit } from '@angular/core';
import {
  ViewerConfiguration,
  MapLayerProviderOptions,
  AcNotification,
  ActionType,
  AcEntity,
} from 'angular-cesium';
import {
  Subject,
  timer,
  Event,
  interval,
  combineLatest,
  Observable,
  fromEvent,
} from 'rxjs';
import { delay, throttle } from 'rxjs/operators';
import { tryFunctionOrLogError } from 'apollo-utilities';

export interface Vector2 {
  x: number;
  y: number;
}

export interface PlanePositionAndGyro {
  position: Vector2;
  rotation: number;
  throttle:number;
  turnForce:number;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  providers: [ViewerConfiguration],
})
export class GameComponent implements OnInit {
  flyToOptions = {
    duration: 0,
    destination: Cesium.Cartesian3.fromRadians(0.6, 0.55, 690000),
  };
  map = {
    provider: MapLayerProviderOptions.ArcGisMapServer,
    options: {
      url:
        'https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer',
    },
  };

  getCurrentPosition$ = new Observable<Position>((subscriber) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        subscriber.next(position);
        subscriber.complete();
      },
      (err) => {
        subscriber.error(err);
      }
    );
  });

  planes$ = new Subject<AcEntity>();
  PlaneController: PlanePositionAndGyro = {
    rotation: 0,
    position: {
      x: 0,
      y: 0,
    },
    turnForce:2.2,
    throttle:0
  };

  constructor(private viewerConf: ViewerConfiguration) {
    viewerConf.viewerOptions = {
      selectionIndicator: false,
      timeline: false,
      infoBox: true,
      fullscreenButton: false,
      baseLayerPicker: false,
      animation: false,
      shouldAnimate: false,
      homeButton: false,
      geocoder: false,
      navigationHelpButton: false,
      navigationInstructionsInitiallyVisible: false,
    };

    viewerConf.viewerModifier = (viewer: any) => {
      viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK
      );
    };

    fromEvent(document, 'keydown')
      .pipe(
        throttle((ev) => interval(25)),
        map((e) => (e as KeyboardEvent).key),
        filter((keyDown) => ['ArrowLeft', 'ArrowRight','ArrowUp','ArrowDown'].includes(keyDown))
      )
      .subscribe((keydown) => {
        switch (keydown) {
          case 'ArrowLeft': {
            this.PlaneController.rotation -= this.PlaneController.turnForce;
            break;
          }
          case 'ArrowRight': {
            this.PlaneController.rotation += this.PlaneController.turnForce;
            break;
          }
          case 'ArrowUp':{
            if(this.PlaneController.throttle>0.5) break;
            this.PlaneController.throttle+=0.05;
            break;
          }
          case 'ArrowDown': {
            if(this.PlaneController.throttle>0)
            this.PlaneController.throttle-=0.05;
            else {
              this.PlaneController.throttle=0;
            }
            break;
          }
          default:
            break;
        }
      });

    timer(2000, 25).subscribe(() => {
      const position = point([
        this.PlaneController.position.x,
        this.PlaneController.position.y,
      ]);
      const newPosition = destination(
        position,
        this.PlaneController.throttle,
        this.PlaneController.rotation > 180
          ? this.PlaneController.rotation - 360
          : this.PlaneController.rotation
      );
      this.PlaneController.position.x = newPosition.geometry.coordinates[0];
      this.PlaneController.position.y = newPosition.geometry.coordinates[1];

      this.planes$.next(
        new AcEntity({
          id: '1',
          name: 'plane',
          actionType: ActionType.ADD_UPDATE,
          entity: {
            position: Cesium.Cartesian3.fromDegrees(
              this.PlaneController.position.x,
              this.PlaneController.position.y,
              null
            ),
            rotation: -1 * degreesToRadians(this.PlaneController.rotation - 90),
            image: 'assets/images/plane.png',
            scale: 0.5,
          },
        })
      );
    });

    this.getCurrentPosition$.subscribe((position) => {
      this.PlaneController.position.x = position.coords.longitude;
      this.PlaneController.position.y = position.coords.latitude;
    });
  }

  ngOnInit(): void {}
}
