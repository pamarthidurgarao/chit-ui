import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CheeptipataComponent } from './cheeptipata.component';

describe('CheeptipataComponent', () => {
  let component: CheeptipataComponent;
  let fixture: ComponentFixture<CheeptipataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheeptipataComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CheeptipataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
