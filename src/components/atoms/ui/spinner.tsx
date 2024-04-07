'use client'
import React, {type FC, memo} from 'react';

type SpinnerProps = {
    className?: string;
};

const Spinner: FC<SpinnerProps> = memo(({className = 'h-4 w-4'}) => (
    <div className={`animate-spin rounded-full border-2 border-primary ${className}`}></div>
));

Spinner.displayName = 'Spinner';

export default Spinner;
