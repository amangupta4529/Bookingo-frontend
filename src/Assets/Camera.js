import * as React from "react"

const Camera = (props) => (
  <svg
    width={40}
    height={40}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    {...props}
  >
    <circle cx={20} cy={20} r={19.5} fill="#fff" stroke="#C4C4C4" />
    <path fill="url(#a)" d="M5 5h30v30H5z" />
    <defs>
      <pattern
        id="a"
        patternContentUnits="objectBoundingBox"
        width={1}
        height={1}
      >
        <use xlinkHref="#b" transform="scale(.01111)" />
      </pattern>
      <image
        id="b"
        width={90}
        height={90}
        xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFoAAABaCAYAAAA4qEECAAAABmJLR0QA/wD/AP+gvaeTAAAEaklEQVR4nO2cz48UVRDHPwvR4aCcuAjjKv7IriR6MCi/1rPxF6JHr8YYVHb/GUk0wklBOWqiqMSTv0/qxSURIcYEonBhZwDDzDoeqtuYWar7OV3vvd7Z+iR1eTt5VfXdnu7X9eoNOI7jOI7jOI7jOI7jOJbsBI4CF4ABMDKyAXAeeBO4N1k2LeVFoIeduJr1gBcS5dQ69gI3iS9yaTeBx5Nk1jK+I53IpX2dJLMWcT/pRS5tZ4L81rAph1NgXya/APtzOM0l9MOZ/GbznUvoRzL5ze07KbcBl8l3j75cxJCUHFf0s8C2DH5LtgHPZPSfhFngEvmu5tIuFrFMFZuAB4BF4Ar5RS7tCnCkiC3Xs0plC7AEfA/0yS9WausjL1qLQKehlipd4KcWJNsW+7HQxJQtuMia2KZX9lILkmqrHQkRMPQh8FLg5zYiQdrMBE7WA+6YPJappg/cWfehUKFHzWKZmHPAZ0h58yzwG/JPB9iKrIXngQXgSaQqmINQHWtJec8bAO8xWYVvP3ACGCaO2YxUAZ8GHjSIdw75JrjQY3YNeNky4IJXgOsJ4jcjZpB/AI9aBjvGbuDPyDmYEVPkOctAFeaIK7YZMYK7RtiVPIu8FHyKrDz6hZ0txt4A7g6YZzdwI1IuZsQIru6e3AWOE7aCGALHgB01c74aKRczrAM7XePvEJM11qwAB2vmPhMhHzMsgxpQvYRbAlYbzL+KlDE15rFfZ5thGdS7FX4O0Uzk/4pddWW/b5yTGZZBaW98XWz78FaA7YqvA8Y5mWEV0C8VPo4b+intHcXXDNJpOrVCH1XmnyVOfWKIvgvylqGfWlJvSn6ljD8PbI7gb3Mx9634MoI/ldRCLyvjT0f0qc2txRKF1EL/rozfF9GnVqPWYolC6sJ/B2kIHyfmDo62A9IB/jLyUatj6xpHIvB37gAgvdDa3trFiD4vKeNbI/pcQ2qhtX638xF9/qqMJ+29Sy30Q8r4xxF9anNrsUQhtdAHlPEPkfqENUPgI+VvCxH8NcbqDeoc+hP6mKGf0t5WfM0gB0in9hV8hF5U2oEUgqz8XAXuUnwtGOdkhmVQJyr8PIVNzWMVeK7CzynjnMywDGpI9YbsIs0L/1WNh7vYIIX/EdLcUsVBJruNXEXOyFTxRYR8zLAObIQ0t1SxHaknh1x9A+TBp92TSw5HysWMGMFdR1oA6ugCrwOfIBW3XmHLyBr5NcI67/ewQdsNRkhTS4oGmnninm00I1aApdiPWQY7xh68Jexfu4E0t1hzmHi3i3UpdGlnkK95U3YRZ3UxNUKPkFXGSaQu8n866WeQN74PsOkNMRW67UcrLgCfIxupy6w9WnEP8g14AjlaketHqmp1bLvQ6wXfymoLLnQiQoXuR41ifbMS8qFQoX9uEMi0E6RNqNBVNeSNjqk2HeQkf8q16XqwH4DbG+h6S7q42OMi152ZmZgOsnvxLWl+vLVt1gO+QU6CmV/JjuM4juM4juM4juM4juM4U8w/t9ZBXkrnk+0AAAAASUVORK5CYII="
      />
    </defs>
  </svg>
)

export default Camera
