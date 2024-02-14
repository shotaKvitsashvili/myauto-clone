import Image from 'next/image'
import Link from 'next/link'

type Props = {}

function Header({ }: Props) {
    return (
        <header className='sticky bg-white py-4'>
            <div className='container'>
                <Link href="/">
                    <Image
                        width={161}
                        height={46}
                        alt='logo'
                        src="/logo.svg"
                    />
                </Link>
            </div>
        </header>
    )
}

export default Header