import HabitPresenter from "../habit_presenter"

describe("HabitPresenter", () => {
  const habits = [
    { id: 1, name: "Reading", count: 1 },
    { id: 2, name: "Running", count: 0 },
  ]
  let presenter
  let update

  beforeEach(() => {
    presenter = new HabitPresenter(habits, 3)
    update = jest.fn()
  })

  describe("init", () => {
    it("inits with habits", () => {
      expect(presenter.getHabits()).toEqual(habits)
    })
  })

  describe("increment", () => {
    it("increments habit count and call update callback", () => {
      presenter.increment(habits[0], update)

      expect(presenter.getHabits()[0].count).toBe(2)
      checkUpdateIsCalled()
    })
  })

  describe("decrement", () => {
    it("decrements habit count and call update callback", () => {
      presenter.decrement(habits[0], update)

      expect(presenter.getHabits()[0].count).toBe(0)
      checkUpdateIsCalled()
    })

    it("does not set the count value below 0 when decrements", () => {
      presenter.decrement(habits[0], update)
      presenter.decrement(habits[0], update)

      expect(presenter.getHabits()[0].count).toBe(0)
    })
  })

  describe("delete", () => {
    it("deletes habit from the list and call update callback", () => {
      presenter.delete(habits[0], update)

      expect(presenter.getHabits().length).toBe(1)
      expect(presenter.getHabits()[0].name).toBe("Running")
      checkUpdateIsCalled()
    })
  })

  describe("add", () => {
    it("adds habit to the list and call update callback", () => {
      presenter.add("Eating", update)

      expect(presenter.getHabits().length).toBe(3)
      expect(presenter.getHabits()[2].name).toBe("Eating")
      expect(presenter.getHabits()[2].count).toBe(0)
      checkUpdateIsCalled()
    })

    it("throws an error when the max habits limit is exceeded", () => {
      presenter.add("Eating", update)
      expect(() => {
        presenter.add("Eating", update)
      }).toThrow("Habits count cannot be over than 3")
    })
  })

  describe("reset", () => {
    it("resets all habit counts to 0 and call update callback", () => {
      presenter.reset(update)

      expect(presenter.getHabits()[0].count).toBe(0)
      expect(presenter.getHabits()[1].count).toBe(0)
      checkUpdateIsCalled()
    })

    it("does not create new object when count is 0", () => {
      const habits = presenter.getHabits()
      presenter.reset(update)
      const updatedHabits = presenter.getHabits()

      expect(updatedHabits[1]).toBe(habits[1])
    })
  })

  function checkUpdateIsCalled() {
    expect(update).toHaveBeenCalledTimes(1)
    expect(update).toHaveBeenCalledWith(presenter.getHabits())
  }
})
