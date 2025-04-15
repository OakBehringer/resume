import akLogo from './assets/ak-logo.svg';

function App() {

  return (
      <div className="w-md mx-auto text-neutral-700 text-center">
          <img src={akLogo} alt="Adam Kosecki" />
          <h1 className="text-xl font-black">Adam Kosecki</h1>

          <div className="mt-12 text-lg space-y-4">
              <div>
                  <a className="underline" href="/docs/Adam%20Kosecki%20-%20Resume.pdf" target="_blank">Resume</a>
              </div>
              <div>
                  <a className="underline" href="https://www.linkedin.com/in/adam-kosecki-12867329/" target="_blank">LinkedIn</a>
              </div>
              <div>
                  <a className="underline" href="https://www.instagram.com/oakbehringer/" target="_blank">Instagram</a>
              </div>
              <div>
                  <a className="underline" href="https://www.facebook.com/profile.php?id=856195000" target="_blank">Facebook</a>
              </div>
          </div>
      </div>
  )
}

export default App
