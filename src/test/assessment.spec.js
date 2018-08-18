/* global describe, it */
const expect = require('expect.js');
const lib = require('../js/assessment');

describe('Assessment.js', () => {
  describe('getApiCoursePercent', () => {
    it('100% all', () => {
      expect(lib.getApiCoursePercent({ homework: 100, final: 100 })).to.be(100);
    });

    it('100% attendance, final', () => {
      expect(lib.getApiCoursePercent({ final: 100 })).to.be(73);
    });

    it('100% attendance, homework', () => {
      expect(lib.getApiCoursePercent({ homework: 100 })).to.be(60);
    });

    it('100% attendance', () => {
      expect(lib.getApiCoursePercent()).to.be(33);
    });

    it('100% final', () => {
      expect(lib.getApiCoursePercent({ attendance: 0, final: 100 })).to.be(40);
    });

    it('100% homework', () => {
      expect(lib.getApiCoursePercent({ attendance: 0, homework: 100 })).to.be(27);
    });
  });

  describe('getJqueryCoursePercent', () => {
    it('100% attendance', () => {
      expect(lib.getJqueryCoursePercent(100)).to.be(100);
      expect(lib.getJqueryCoursePercent(50)).to.be.within(66, 67);
      expect(lib.getJqueryCoursePercent(0)).to.be(33);
    });

    it('80% attendance', () => {
      expect(lib.getJqueryCoursePercent(100, 80)).to.be(93);
      expect(lib.getJqueryCoursePercent(50, 80)).to.be(60);
      expect(lib.getJqueryCoursePercent(0, 80)).to.be(27);
    });

    it('60% attendance', () => {
      expect(lib.getJqueryCoursePercent(100, 60)).to.be(87);
      expect(lib.getJqueryCoursePercent(50, 60)).to.be(53);
      expect(lib.getJqueryCoursePercent(0, 60)).to.be(20);
    });
  });

  describe('getSkillPercent', () => {
    it('one assignment', () => {
      expect(lib.getSkillPercent([[10, 10]])).to.be(100);
      expect(lib.getSkillPercent([[6, 10]])).to.be(60);
      expect(lib.getSkillPercent([[3, 10]])).to.be(30);
      expect(lib.getSkillPercent([[2, 10]])).to.be(20);
      expect(lib.getSkillPercent([[0, 10]])).to.be(0);
    });

    it('two assignments', () => {
      expect(lib.getSkillPercent([[10, 10], [10, 10]])).to.be(100);
      expect(lib.getSkillPercent([[6, 10], [6, 10]])).to.be(60);
      expect(lib.getSkillPercent([[3, 10], [3, 10]])).to.be(30);
      expect(lib.getSkillPercent([[2, 10], [2, 10]])).to.be(20);
      expect(lib.getSkillPercent([[0, 10], [0, 10]])).to.be(0);
    });

    it('assignments with same result', () => {
      expect(lib.getSkillPercent([[10, 10], [10, 10], [5, 5], [5, 5]])).to.be(100);
      expect(lib.getSkillPercent([[6, 10], [6, 10], [3, 5], [3, 5]])).to.be(60);
      expect(lib.getSkillPercent([[3, 10], [3, 10], [1.5, 5], [1.5, 5]])).to.be(30);
      expect(lib.getSkillPercent([[2, 10], [2, 10], [1, 5], [1, 5]])).to.be(20);
      expect(lib.getSkillPercent([[0, 10], [0, 10], [0, 5], [0, 5]])).to.be(0);
    });

    it('assignments with varied result', () => {
      expect(lib.getSkillPercent([[10, 10], [10, 10], [5, 5], [5, 5], [19, 20]])).to.be(98);
      expect(lib.getSkillPercent([[6, 10], [6, 10], [3, 5], [3, 5], [20, 20]])).to.be(76);
      expect(lib.getSkillPercent([[3, 10], [3, 10], [1.5, 5], [1.5, 5], [20, 20]])).to.be(58);
      expect(lib.getSkillPercent([[2, 10], [2, 10], [1, 5], [1, 5], [24, 20]])).to.be(60);
      expect(lib.getSkillPercent([[0, 10], [0, 10], [0, 5], [0, 5], [5, 20]])).to.be(10);
    });

    it('assignments with decimal result', () => {
      expect(lib.getSkillPercent([[1, 3], [7, 13], [17, 17]])).to.be(Math.round((25 / 33) * 100));
      expect(lib.getSkillPercent([[5, 7], [11, 13], [14, 17]])).to.be(Math.round((30 / 37) * 100));
    });
  });

  describe('getApiCoursePercent with getSkillPercent', () => {
    it('100% all', () => {
      const homework = lib.getSkillPercent([[10, 10]]);
      expect(lib.getApiCoursePercent({ homework, final: 100 })).to.be(100);
    });
  });
});
