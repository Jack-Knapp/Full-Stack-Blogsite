import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog />', () => {

    const sampBlog = {
        "title": "Sample Title",
        "author": "Sample Author",
        "url": "Sample URL",
        "likes": 12,
        "user" : {
          "username": "Temp username",
          "name" : "Temp name",
          "id" : "Temp User ID"
        },
        "id" : "Temp Blog ID"
    }

    test('Renders Blog', ()=> {
        
        //mock handler 1
        const mockHandler1 = vi.fn()
    
        //mock handler 2
        const mockHandler2 = vi.fn()
    
        render(<Blog blog={sampBlog} handlePut={mockHandler1} handleDelete={mockHandler2}/>)
    
        const element = screen.getByText('Sample Title - Sample Author')
        //screen.debug(element)
    
        const hiddenURL = screen.getByText("Sample URL")
        const hiddenLikes = screen.getByText("Likes: 12")
    
        expect(element).toBeDefined()
        expect(hiddenURL).toHaveStyle('display: none')
        expect(hiddenLikes).toHaveStyle('display: none')
    })
    
    test('Shows Likes and URL on click', async () => {
            
        render(<Blog blog={sampBlog} />)
    
        const user=userEvent.setup()
        const button = screen.getByText("view", {exact: false})
        await user.click(button)
    
        const hiddenURL = screen.getByText("Sample URL")
        const hiddenLikes = screen.getByText("Likes: 12")
    
        expect(hiddenURL).not.toHaveStyle('display: none')
        expect(hiddenLikes).not.toHaveStyle('display: none')
    })

    test('Like button receives multiple clicks', async ()=> {

        //mock handler 1
        const mockHandler1 = vi.fn()
    
        //mock handler 2
        const mockHandler2 = vi.fn()
    
        render(<Blog blog={sampBlog} handlePut={mockHandler1} handleDelete={mockHandler2}/>)

        const user=userEvent.setup()
        const button = screen.getByText("like")
        await user.click(button)
        await user.click(button)

        expect(mockHandler1.mock.calls).toHaveLength(2)
    })
})
