import React from 'react'
import {
  Container,
  Box,
  Divider,
  Breadcrumbs,
  Typography
} from '@material-ui/core'
import CourseThumbnail from './thumbnail.component'
import CourseInfo from './info.component'
import dynamic from 'next/dynamic'
import { CourseDetailPropTypes } from '@/utils/typing'
import NextLink from '@/components/nextlink'
import { NavigateNext } from '@material-ui/icons'
import { routes } from '@/utils/app'

const CourseLectures = dynamic(() => import('./content.component'))
const CourseContent = dynamic(() => import('./detail.component'))

export default function CourseDetail({ course }) {
  const { category, topic, title } = course
  return (
    <>
      <CourseThumbnail course={course} />
      <Container maxWidth="md">
        <Box paddingY={1}>
          <Breadcrumbs separator={<NavigateNext />}>
            <NextLink color="inherit" href={routes.category(category.name)}>
              <Typography style={{ textTransform: 'capitalize' }}>
                {category.label}
              </Typography>
            </NextLink>
            <NextLink
              color="inherit"
              href={routes.topic(category.name, topic.name)}
            >
              <Typography style={{ textTransform: 'capitalize' }}>
                {topic.label}
              </Typography>
            </NextLink>
          </Breadcrumbs>
        </Box>
        <CourseInfo course={course} />
        <Box paddingY={2}>
          <Divider />
        </Box>
        <CourseLectures course={course} />
        <Box paddingY={1} />
        <CourseContent course={course} />
        <Box height="15vh" />
      </Container>
    </>
  )
}

CourseDetail.propTypes = {
  course: CourseDetailPropTypes.isRequired
}
