/* global describe, it */
const expect = require('expect.js');
const lib = require('../js/calendar');

describe('Calendar.js', () => {
  it('takes a date object and returns string date', () => {
    const date = new Date(2017, 8, 6);

    expect(lib.getDateDay(date)).to.be('2017-09-06');
    expect(lib.getDateStart(date)).to.be('2017-09-06 09:00:00');
    expect(lib.getDateEnd(date)).to.be('2017-09-06 12:17:00');
  });

  it('returns next dates', () => {
    const week1 = new Date();
    const week2 = new Date().setHours(24 * 7);
    const week3 = new Date().setHours(24 * 14);
    const course = lib.createCourseSchedule();

    const class1 = course.getNextClass();
    expect(class1.day).to.be(lib.getDateDay(week1));
    expect(class1.title).to.be('Dan\'s class 1');

    const class2 = course.getNextClass();
    expect(class2.day).to.be(lib.getDateDay(week2));
    expect(class2.title).to.be('Dan\'s class 2');

    const lastClass = course.getNextClass();
    expect(lastClass.title).to.be('Dan\'s class 3');
    expect(lastClass.day).to.be(lib.getDateDay(week3));
    expect(lastClass.start).to.be(lib.getDateStart(week3));
    expect(lastClass.end).to.be(lib.getDateEnd(week3));
  });

  it('takes a start date and returns next dates and date is immutable', () => {
    const firstDate = new Date(2017, 8, 6); // Sept 6th

    const course = lib.createCourseSchedule('API')
      .setFirstClassDate(firstDate);

    const class1 = course.getNextClass();
    expect(class1.day).to.be('2017-09-06');
    expect(class1.title).to.be('API 1');

    const class2 = course.getNextClass();
    expect(class2.day).to.be('2017-09-13');
    expect(class2.title).to.be('API 2');

    const lastClass = course.getNextClass();
    expect(lastClass.title).to.be('API 3');
    expect(lastClass.day).to.be('2017-09-20');
    expect(lastClass.start).to.be('2017-09-20 09:00:00');
    expect(lastClass.end).to.be('2017-09-20 12:17:00');

    // immutable test
    expect(firstDate.toString()).to.be(new Date(2017, 8, 6).toString());
  });

  it('takes odd class interval and returns next dates', () => {
    const firstDate = new Date(2017, 8, 6); // Sept 6th

    const course = lib.createCourseSchedule()
      .setFirstClassDate(firstDate)
      .setDaysBetweenClasses([1, 1, 2]);

    expect(course.getNextClass().day).to.be('2017-09-06');
    expect(course.getNextClass().day).to.be('2017-09-07');
    expect(course.getNextClass().day).to.be('2017-09-08');

    const lastClass = course.getNextClass();
    expect(lastClass.day).to.be('2017-09-10');
    expect(lastClass.start).to.be('2017-09-10 09:00:00');
    expect(lastClass.end).to.be('2017-09-10 12:17:00');
  });

  it('returns all classes ensure between is immutable', () => {
    const between = [1, 2, 3];
    const course = lib.createCourseSchedule()
      .setDaysBetweenClasses(between);

    expect(course.getAllClasses().length).to.be(3);

    // immutable test
    expect(course.getAllClasses().length).to.be(between.length);
  });
});
