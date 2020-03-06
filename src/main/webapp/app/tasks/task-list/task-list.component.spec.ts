import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { of } from 'rxjs';

import { TaskService } from '../task.service';
import { TaskListComponent } from './task-list.component';

describe('TaskListComponent', () => {
  let component: TaskListComponent;
  let fixture: ComponentFixture<TaskListComponent>;
  let taskService: jasmine.SpyObj<TaskService>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TaskListComponent],
      providers: [{
        provide: 'TaskService',
        useValue: jasmine.createSpyObj('taskService', ['update', 'delete', 'deleteAllDone'])
      }]
    }).overrideTemplate(TaskListComponent, '')
      .compileComponents();

    taskService = TestBed.get('TaskService');
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should update a task', () => {
    // given
    taskService.update.and.returnValue(of(null));

    // when
    component['update']([]);

    // then
    expect(taskService.update).toHaveBeenCalledWith([]);
  });

  it('should emit nothing after update', () => {
    // given
    taskService.update.and.returnValue(of(null));
    const updateEmitter = spyOn(component.updated, 'emit');

    // when
    component['update']([]);

    // then
    expect(updateEmitter).toHaveBeenCalledWith();
  });

  it('should delete a task', () => {
    // given
    taskService.delete.and.returnValue(of(null));

    // when
    component.delete({id: 'id', name: 'My task', done: false});

    // then
    expect(taskService.delete).toHaveBeenCalledWith('id');
  });

  it('should emit nothing after deletion', () => {
    // given
    taskService.delete.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deleted, 'emit');

    // when
    component.delete({id: 'id', name: 'My task', done: false});

    // then
    expect(deleteEmitter).toHaveBeenCalledWith();
  });

  it('should delete all tasks', () => {
    // given
    taskService.deleteAllDone.and.returnValue(of(null));

    // when
    component.deleteAllDone();

    // then
    expect(taskService.deleteAllDone).toHaveBeenCalledWith();
  });

  it('should emit nothing after deletion of all tasks', () => {
    // given
    taskService.deleteAllDone.and.returnValue(of(null));
    const deleteEmitter = spyOn(component.deletedAll, 'emit');

    // when
    component.deleteAllDone();

    // then
    expect(deleteEmitter).toHaveBeenCalledWith();
  });
});
