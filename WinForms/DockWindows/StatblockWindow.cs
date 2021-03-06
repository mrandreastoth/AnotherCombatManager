﻿using System;
using AnotherCM.Library.Common;
using WeifenLuo.WinFormsUI.Docking;

namespace AnotherCM.WinForms.DockWindows {
    public partial class StatBlockWindow : DockContent {
        #region Constructors

        public StatBlockWindow () {
            InitializeComponent();
        }

        #endregion

        #region Public Properties

        public Combatant Combatant {
            get {
                return this.statblockControl.SelectedObject as Combatant;
            }
            set {
                if (value == null) {
                    throw new ArgumentNullException("value");
                }
                this.Text = value.Name;
                this.statblockControl.SelectedObject = value;
            }
        }

        #endregion
    }
}
