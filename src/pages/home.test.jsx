import { describe, it, expect } from "vitest"

// A small function to simulate the category toggle logic
function toggleCategory(current, category) {
  return current === category ? null : category
}

describe("Home component - category toggle", () => {

  // Test 1:
  it("should open a closed category", () => {
    let openCategory = null // first nothing is open
    openCategory = toggleCategory(openCategory, "Health") // click health
    expect(openCategory).toBe("Health") // should open Health
  })

  // Test 2:
  it("should close an open category when toggled again", () => {
    let openCategory = "Sport"

    openCategory = toggleCategory(openCategory, "Sport")

    expect(openCategory).toBe(null)
  })

})
