import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SearchMemberPage } from './search-member.page';

describe('SearchMemberPage', () => {
  let component: SearchMemberPage;
  let fixture: ComponentFixture<SearchMemberPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchMemberPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchMemberPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
