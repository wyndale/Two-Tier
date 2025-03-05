using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server.Data;
using server.Entities;

[ApiController]
[Route("api/events")]
public class EventsController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public EventsController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Event>>> GetEvents()
    {
        return await _context.Events.ToListAsync();
    }
    [HttpGet("{id}")]
    public async Task<ActionResult<Event>> GetEventById(int id)
    {
        var evnt = await _context.Events.FindAsync(id);

        if (evnt == null)
            return NotFound();

        return Ok(evnt);
    }


    [HttpPost]
    public async Task<ActionResult<Event>> AddEvent(Event evnt)
    {
        _context.Events.Add(evnt);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEvents), new { id = evnt.Id }, evnt);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateEvent(int id, Event updatedEvent)
    {
        if (id != updatedEvent.Id)
            return BadRequest();

        var existingEvent = await _context.Events.FindAsync(id);
        if (existingEvent == null)
            return NotFound();

        existingEvent.Name = updatedEvent.Name;
        existingEvent.Location = updatedEvent.Location;
        existingEvent.Date = updatedEvent.Date;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteEvent(int id)
    {
        var evnt = await _context.Events.FindAsync(id);
        if (evnt == null) return NotFound();

        _context.Events.Remove(evnt);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
