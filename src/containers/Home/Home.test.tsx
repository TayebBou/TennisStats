import { render, RenderResult, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Provider } from 'react-redux'
import Home from '../../App'
import store from '../../config/store'

describe('Home Page',() => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>,
    )
  })
  test('at least 5 cards are fetched in the page', async () => {
    
 
    const players = await screen.findAllByAltText('Tennis Player', { exact: false })    
    expect(players.length).toBeGreaterThanOrEqual(5)
  })
  test('the top 3 players are displayed in order', async () => {
 
    const ranks = await screen.findAllByText(/#/)
      const rankOne = parseInt((ranks[0].textContent as string).replace("#", ''))
      const rankTwo = parseInt((ranks[1].textContent as string).replace("#", ''))
      const rankThree = parseInt((ranks[2].textContent as string).replace("#", ''))
    
      expect(rankTwo).toBeGreaterThan(rankOne)
      expect(rankThree).toBeGreaterThan(rankTwo)
  })
  test('when user click on a card the modal appear with more details', async () => {
    const players = await screen.findAllByAltText('Tennis Player', { exact: false })
    userEvent.click(players[0])

    const age = ((screen.getByText('AGE').closest('div') as HTMLDivElement).children.item(1) as Element).textContent
    const birthday = ((screen.getByText('BIRTHDAY').closest('div') as HTMLDivElement).children.item(1) as Element)
    expect(parseInt(age as string)).toBeGreaterThanOrEqual(18)
    expect(birthday).not.toBeEmptyDOMElement()
  })
})

