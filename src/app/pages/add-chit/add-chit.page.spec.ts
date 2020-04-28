import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddChitPage } from './add-chit.page';

describe('AddChitPage', () => {
  let component: AddChitPage;
  let fixture: ComponentFixture<AddChitPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddChitPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddChitPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
