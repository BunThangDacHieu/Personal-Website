import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNarbarComponent } from './category-narbar.component';

describe('CategoryNarbarComponent', () => {
  let component: CategoryNarbarComponent;
  let fixture: ComponentFixture<CategoryNarbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoryNarbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoryNarbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
