import setuptools

setuptools.setup(
    name="onpoint",
    py_modules=["onpoint"],
    entry_points={"console_scripts": ["onpoint=onpoint.__main__:cli"]},
)
