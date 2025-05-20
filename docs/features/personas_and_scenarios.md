# Personas and User Scenarios

## Persona 1: Thando Mokoena (Student)
- **Age:** 21  
- **Program:** BSc Computer Science, 3rd Year  
- **Tech Skill Level:** Advanced  
- **Goals:**  
  - Schedule appointments with lecturers easily  
  - Receive confirmations and directions  
- **Frustrations:**  
  - Can’t view lecturer availability in real-time  
  - Often forgets appointment times or overlaps schedules  

## Persona 2: Dr. Sipho Dlamini (Lecturer)
- **Age:** 38  
- **Department:** Natural Science
- **Tech Skill Level:** Intermediate  
- **Goals:**  
  - Organize and manage meeting times efficiently  
  - Reduce no-shows and last-minute changes  
- **Frustrations:**  
  - Students booking outside availability  
  - Miscommunication or missed messages

## Persona 3: Lethabo Monyela (The Panic Booker)
**Role:** Final-Year Computer Science Student  
**Age:** 22  
**Tech Skill Level: Advanced**  
**Goals:**
- Book last-minute appointments before project deadlines
- Avoid awkward small talk with lecturers
- Navigate campus without ending up in the cafeteria (again)

**Frustrations:**
- "Why does Dr. Khumalo's calendar look like a game of Tetris?"
- System showing "No slots available" during crunch time
- Lecturers who reply "See me during office hours" to emergency emails

# User Scenarios

##  Scenario 1
**Persona:** Lethabo Monyela (The Panic Booker)  
**When:** 3 AM before a project demo  
**What Happens:**  
1. Lethabo logs in bleary-eyed and desperate  
2. Discovers Dr. Khumalo’s mysterious “Mercy Slot” (8:00–8:15 AM)  
3. Books it immediately while muttering “Please work please work...”  
4. Receives confirmation with a chilling note: _“Bring coffee.”_  

**Linked User Stories:**  
- US-01: Emergency booking system  
- US-07: Confirmation notifications  

## Scenario 2
**Persona:** Dr. Sipho Dlamini (Lecturer stand-in)  
**When:** Final exam grading week  
**What Happens:**  
1. Dr. Khumalo activates "Do Not Disturb: Apocalypse Mode"  
2. Booking attempts trigger automated meme GIFs as replies  
3. Lethabo (The Panic Booker) receives: _“Prof. is currently fighting a dragon (your exam script). Try again later.”_  
4. Admin Ms. Ndlovu logs it as: _“Best. Auto-reply. Ever.”_  

**Linked User Stories:**  
- US-11: Lecturer availability controls  
- US-14: Automated status responses
  
## Scenario 3 
**Persona:** Admin   
**When:** Routine system audit  
**What Happens:**  
1. System flags a suspicious user: _“Prof. Vambe – AI Department”_  
2. Ms. Ndlovu investigates and finds a profile pic of Terminator sunglasses  
3. Adds a verification step: “Upload a photo with today’s newspaper”  
4. The account vanishes instantly. Suspicious right....  

**Linked User Stories:**  
- US-21: Account verification  
- US-25: Security logging  

## Scenario 4
**Persona:** Thando Mokoena (Student)  
**When:** Mid-semester academic planning  
**What Happens:**  
1. Thando logs into the system and searches for **“Dr. Dlamini”** under the Natural Science department  
2. She views his real-time availability and books a slot for academic consultation  
3. She receives a confirmation notification along with a digital campus map and office directions  
4. On the day of the appointment, she checks his status as **“Available”** and attends the session on time  

**Linked User Stories:**  
- US-03: Search by department or lecturer  
- US-07: Booking confirmation and directions  
- US-10: Real-time status updates  


## Scenario 5
**Persona:** Dr. Sipho Dlamini (Lecturer)  
**When:** Weekly office hour planning  
**What Happens:**  
1. Dr. Dlamini logs in to view his personalized schedule and sees Thando’s new appointment request  
2. He accepts the appointment and updates his status to **“Busy”**, preventing overlapping bookings  
3. After the session, he sends Thando additional reading materials via the system’s messaging feature  

**Linked User Stories:**  
- US-09: Manage lecturer availability  
- US-13: Prevent overlapping appointments  
- US-18: Post-appointment communication  

