import React from 'react'
import PropTypes from 'prop-types'
import Banner from './banner.component'
import TopTrending from './trending.component'
import Head from 'next/head'
import dynamic from 'next/dynamic'
import 'typeface-dancing-script'
import DrawerProvider from '@/features/home/drawer.component'

const AppBarProvider = dynamic(() => import('./appbar.component'))
export default function HomePage({ courses }) {
  return (
    <DrawerProvider>
      <Head>
        <title>Urskyll - Online Courses, Catch Up To Modern Technology</title>
      </Head>
      <AppBarProvider />
      <Banner target="target" />
      <TopTrending courses={courses} />
    </DrawerProvider>
  )
}

HomePage.propTypes = {
  courses: PropTypes.array
}

HomePage.defaultProps = {
  courses: []
}
