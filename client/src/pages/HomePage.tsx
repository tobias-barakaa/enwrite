import React from 'react'
import HeroSection from '../components/HeroSection'
import Portfolio from '../components/Portfolio'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import GetStarted from '../components/GetStarted'
import HeroHomeLayout from '../components/HeroHomeLayout'

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroHomeLayout />
      {/* // <HeroSection /> */}
      <Portfolio />
      <Services />
      <Testimonials />
      <GetStarted />
      {/* <Faq /> */}
    </div>
  )
}

export default HomePage
