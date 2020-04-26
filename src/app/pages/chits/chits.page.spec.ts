import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ChitsPage } from './chits.page';

describe('ChitsPage', () => {
  let component: ChitsPage;
  let fixture: ComponentFixture<ChitsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChitsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ChitsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
