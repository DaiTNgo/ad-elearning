import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { axiosCourse, axiosInstructor } from '../axios';
import CourseCard from '../components/CourseCard';
import { useAppSelector } from '../hooks/redux';
import { getAccessToken, getUser } from '../redux/authSlice';
import { CourseType } from '../types';

function DashBoard() {
	const [courses, setCourses] = useState<CourseType[]>([]);
	const currentUser = useAppSelector(getUser);
	const accessToken = useAppSelector(getAccessToken);

	useEffect(() => {
		let here = true;
		const getCourse = async () => {
			try {
				const resp = await axiosCourse({
					method: 'get',
					url: `/instructor/${currentUser?.id}`,
					headers: {
						Authorization: `Bearer ${accessToken} `,
					},
				});
				if (!here) return;
				setCourses(resp.data.message);
			} catch (error: any) {
				console.log(error);
			}
		};
		getCourse();
		return () => {
			here = false;
		};
	}, []);

	const handleDeleteCourse = async (courseId: CourseType['course_id']) => {
		try {
			axiosInstructor({
				method: 'delete',
				url: `/delete-course/${courseId}`,
				headers: {
					Authorization: `Bearer ${accessToken}`,
				},
			});
			const newCourses = [...courses].filter(
				(course) => course.course_id !== courseId
			);
			setCourses(newCourses);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<Box
			sx={{
				display: 'grid',
				gap: '2rem',
				gridTemplateColumns: 'repeat(auto-fill,minmax(320px,1fr))',
				marginBottom: 2,
			}}>
			{courses.length > 0 ? (
				courses.map((course) => {
					return (
						<CourseCard
							key={course.course_id}
							handleDeleteCourse={handleDeleteCourse}
							course={course}
						/>
					);
				})
			) : (
				<Typography component={'p'}>"You don't have any course!!"</Typography>
			)}
		</Box>
	);
}

export default DashBoard;
