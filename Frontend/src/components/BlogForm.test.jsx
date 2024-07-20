import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

describe('<BlogForm />', () => {

    test('Renders BlogForm', ()=> {
        
        //mock handler
        const mockHandler = vi.fn()
    
        render(<BlogForm handlePost={mockHandler}/>)
        //screen.debug(container)
    
        // const inputs = screen.getAllByRole('textbox')
        // screen.debug(inputs[1])
        // screen.debug(inputs[2])
        const title = screen.getByText('Title:')
        const author = screen.getByText('Author:')
        const URL = screen.getByText('URL:')
            
        expect(title).toBeDefined()
        expect(author).toBeDefined()
        expect(URL).toBeDefined()
    })

    test('Submits Correct Info', async ()=> {

        const sample = {
            "title": "Death of a Salesman",
            "author": "Arthur Miller",
            "url": "https://en.wikipedia.org/wiki/Death_of_a_Salesman",
            "likes": 0
        }

        //mock handler
        const mockHandler = vi.fn()
    
        render(<BlogForm handlePost={mockHandler}/>)
        //screen.debug(container)
     
        const input = screen.getAllByRole('textbox')
        const submitButton = screen.getByText('submit')

        // screen.debug(submitButton)
        // screen.debug(inputs[1])
        // screen.debug(inputs[2])

        await userEvent.type(input[0], 'Death of a Salesman')
        await userEvent.type(input[1], 'Arthur Miller')
        await userEvent.type(input[2], 'https://en.wikipedia.org/wiki/Death_of_a_Salesman')
        await userEvent.click(submitButton)

        //console.log(mockHandler.mock.calls[0])
        expect(mockHandler.mock.calls).toHaveLength(1)
        expect(mockHandler.mock.calls[0][0]).toStrictEqual(sample)
    })
    
})

