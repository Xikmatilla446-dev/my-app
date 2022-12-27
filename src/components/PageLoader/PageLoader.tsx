import classes from './loader.module.scss'
const PageLoader = () => (
	<div className={classes.preloader}>
		<div className={classes.preloaderContainer}>
			<div className={classes.loaderCircleSm} />
			<div className={classes.preloaderLogo} />
		</div>
	</div>
);


export default PageLoader;