import { Link } from 'react-router-dom'
import style from './style.module.scss'

const getPath = (path: string, isAddFocus: boolean) => {
  if(isAddFocus) {
    return `${path}/new`
  }
  return path
}

const getClassName = (pageClassName: string, isAddFocus: boolean, active: boolean, style: {readonly [key: string]: string}) => {
  const classNamesTuples: Array<[string, boolean]> = [[pageClassName, true], [style.add, isAddFocus], [style.active, active]]
  return classNamesTuples
          .filter((tuple) => tuple[1])
          .map(tuple => tuple[0])
          .join(' ')
}

type NavigationLinkProps = {
  pagePath: string,
  isAddFocus: boolean,
  active: boolean,
  icon: JSX.Element,
  pageClassName: string
  onClick: React.MouseEventHandler<HTMLAnchorElement>
}

export const NavigationLink: React.FC<NavigationLinkProps> = ({pagePath, isAddFocus, active, icon, pageClassName, onClick}) => {
  return (
    <Link to={getPath(pagePath, isAddFocus)} className={getClassName(pageClassName, isAddFocus, active, style)} onClick={onClick}>
        {icon}
    </Link>
  )
}
