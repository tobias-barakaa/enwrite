import React from 'react'

import GetStarted from '../components/GetStarted'
import HeroHomeLayout from '../components/HeroHomeLayout'
import LayoutSection from '../components/LayoutSection'
import CustomLayout from '../components/CustomLayout'
import SmoothFeatures from '../components/SmoothFeatures'
import TestimonialsSection from '../components/TestimonialsSection'

const HomePage: React.FC = () => {
  return (
    <div>
      <HeroHomeLayout />
      {/* // <HeroSection /> */}
      <LayoutSection />
      <CustomLayout />
      <SmoothFeatures />
      <TestimonialsSection />
      {/* <Services /> */}
      <GetStarted />
      {/* <Faq /> */}
    </div>
  )
}

export default HomePage
